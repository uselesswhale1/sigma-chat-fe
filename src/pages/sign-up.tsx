import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { authService } from "../api";
import { SignUpDialog } from "../widgets";
import { userAtom } from "../shared/store";
import { SignUpValues } from "../shared/models";
import { useNotifications } from "../shared/hooks";

export const SignUp = () => {
  const [, setUser] = useAtom(userAtom);

  const navigate = useNavigate();
  const notify = useNotifications();

  const isLoading = false;

  const onSubmit = async (v: SignUpValues) => {
    try {
      const res: any = await authService.register({ ...v });

      const { access_token, user } = res.data;

      if (access_token) {
        sessionStorage.setItem("token", access_token);

        setUser(user);

        navigate("/");
        return;
      }
    } catch (error: any) {
      console.log(error);

      notify.error(error.response.data.message || "Failed to create user");
    }
  };

  return <SignUpDialog loading={isLoading} onSubmit={onSubmit} />;
};
