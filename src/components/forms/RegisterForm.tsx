import { Button } from "antd";
import Link from "next/link";
import { TextField, TextFieldPassword } from "../atoms";
interface RegisterFormProps {
	onChangeForm: (type: "login" | "register") => void;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ onChangeForm }) => {
	return (
		<div className="flex flex-col gap-4 h-full flex-1 w-4/5 m-auto justify-center items-center">
			<h1 className="font-bold text-center text-4xl mb-5">Sign up</h1>

			<div className="flex w-full h-fit flex-col">
				<div className="flex flex-col gap-4 justify-center items-center w-full">
					<div className="flex justify-center gap-4">
						<TextField placeholder="First name" />
						<TextField placeholder="Last name" />
					</div>
					<TextField placeholder="Phone number" />
					<TextField placeholder="Username" />
					<TextFieldPassword placeholder="Password" />
					<TextFieldPassword placeholder="Confirm Password" />

					<Button type="primary" className="bg-emerald-500 button-form mt-6">
						Sign up
					</Button>
				</div>

				<span className="text-xs font-semibold text-center text-black/70 h-10 mt-5">
					{"Already have an account. Let's"}
					<span
						onClick={() => onChangeForm("login")}
						className="px-1 text-emerald-500 hover:underline cursor-pointer">
						sign in
					</span>
					{"now."}
				</span>
			</div>
		</div>
	);
};

export default RegisterForm;
