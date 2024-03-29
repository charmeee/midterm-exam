import InputField from "../components/molecules/InputField";
import useForm from "../hook/useForm";
import {signIn} from "../services/apis";
import {Link, useNavigate} from "react-router-dom";
import cookie from "react-cookies";
import {useDispatch} from "react-redux";
import {setId} from "../redux/userSlice";
import Button from "../components/atoms/Button";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValue = {
        id: "",
        password: "",
    }
    const onSubmit = async (value) => {
        try {
            await signIn({
                    email: value.id,
                    password: value.password,
                }
            );
            onLoginSuccess(value.id)
        } catch (e) {
            onLoginFail(e.message);
        }
    }
    const onLoginSuccess = (id) => {
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        cookie.save('user_id', id, {
            path: '/',
            expires,
        });
        dispatch(setId(id));
        alert("로그인이 완료되었습니다!")
        navigate("/");
    }
    const onLoginFail = (message) => {
        alert(message ?? "로그인에 실패했습니다!");
    }

    const {
        values,
        errors,
        submitting,
        handleChange,
        handleSubmit
    } = useForm(initialValue, onSubmit,)

    return (
        <div className="min-h-screen flex justify-center">
            <div className="flex-col max-w-md w-full  m-auto p-8 border-2">
                <h1 className="text-center mb-8">KAKAO</h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <InputField
                            id="login-id"
                            name="id"
                            type="text"
                            value={values.id}
                            onChange={handleChange}
                            error={errors.id}
                            placeholder="아이디를 입력하세요"
                        />
                        <InputField
                            id="login-password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            error={errors.password}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>
                    <Button className="mt-8" type="submit" disabled={submitting}>
                        로그인
                    </Button>
                    <div className="flex justify-center mt-6 mx-6">
                        <Link to="/signup" className="inline-block text-xs">
                            회원가입
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
