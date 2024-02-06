import { useUser } from '@/lib/store/modules/useUser';
import { redirect } from 'next/navigation';

function protectedRoute() {
  const { user } = useUser();

  if (!user) {
    return redirect('/');
  }
}
