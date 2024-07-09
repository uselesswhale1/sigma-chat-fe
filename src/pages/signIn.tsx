import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authService } from "../api";
import { SignInDialog } from "../widgets";
import { userAtom } from "../shared/store";
import { SignInValues } from "../shared/models";
import { useNotifications } from "../shared/hooks";

export const SignIn = (): JSX.Element => {
  const [, setUser] = useAtom(userAtom);

  const navigate = useNavigate();
  const notify = useNotifications();

  const isLoading = false;

  const handleSubmit = async (v: SignInValues) => {
    try {
      const res: any = await authService.login({ ...v });

      const { access_token, ...user } = res.data;

      if (access_token) {
        sessionStorage.setItem("token", access_token);

        setUser(user);

        navigate("/");
        return;
      }
    } catch {
      notify.error("Failed to find user");
    }
  };

  return <SignInDialog onSubmit={handleSubmit} loading={isLoading} />;
};
