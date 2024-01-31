import { useUser } from '@/lib/store/useUser';
import { redirect } from 'next/navigation';

function protectedRoute() {
  const { user } = useUser();

  if (!user) {
    return redirect('/');
  }
}
