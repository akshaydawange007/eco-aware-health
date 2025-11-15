-- Drop existing INSERT policy since history is auto-generated, not user-created
DROP POLICY IF EXISTS "Users can insert their own health history" ON public.health_history;

-- Update SELECT policy to only show last 7 days
DROP POLICY IF EXISTS "Users can view their own health history" ON public.health_history;

CREATE POLICY "Users can view their last 7 days health history" 
ON public.health_history 
FOR SELECT 
USING (
  auth.uid() = user_id 
  AND date >= CURRENT_DATE - INTERVAL '7 days'
);

-- Explicitly deny UPDATE operations (health history should be immutable)
CREATE POLICY "Deny all updates to health history" 
ON public.health_history 
FOR UPDATE 
USING (false);

-- Explicitly deny DELETE operations (only automatic cleanup can delete)
CREATE POLICY "Deny manual deletes of health history" 
ON public.health_history 
FOR DELETE 
USING (false);

-- Create function to delete health history older than 7 days
CREATE OR REPLACE FUNCTION public.cleanup_old_health_history()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.health_history
  WHERE date < CURRENT_DATE - INTERVAL '7 days';
END;
$$;

-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily cleanup at 2 AM UTC
SELECT cron.schedule(
  'cleanup-old-health-history',
  '0 2 * * *',
  'SELECT public.cleanup_old_health_history();'
);