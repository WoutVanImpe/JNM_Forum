import { useMutation } from '@tanstack/react-query';
import { getUsers } from '@/services/user.service';

export const useFetchUsersMutation = () => {
  return useMutation({
    mutationFn: getUsers,
  });
};
