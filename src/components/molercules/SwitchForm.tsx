/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { LoginForm, RegisterForm } from "../forms";
const SwitchForm = () => {
	const [state, setState] = React.useState<"login" | "register">("login");
	const nodeRef = React.useRef<any>(null);

	const onChangeForm = (type: "login" | "register") => {
		setState(type);
	};
	return (
		<SwitchTransition mode="out-in">
			<CSSTransition
				key={state}
				nodeRef={nodeRef}
				addEndListener={(done: any) => {
					if (nodeRef.current)
						nodeRef.current.addEventListener("transitionend", done, false);
					return true;
				}}
				classNames="fade">
				<div ref={nodeRef} className="flex w-full h-full flex-1">
					<div className="switch w-full h-full flex-1">
						{state === "login" && <LoginForm onChangeForm={onChangeForm} />}
						{state === "register" && (
							<RegisterForm onChangeForm={onChangeForm} />
						)}
					</div>
				</div>
			</CSSTransition>
		</SwitchTransition>
	);
};

export default SwitchForm;
