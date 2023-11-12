
import React from "react";
import { Input } from "antd";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}
const TextField: React.FC<InputProps> = (props) => {
	return (
		<Input.Password
			{...props}
			className="w-full placeholder:text-gray-500 h-10 ring-2 ring-gray-200/10 px-4 shadow-md shadow-gray-200 !rounded-lg !border-none py-2 text-sm font-medium flex items-center justify-between"
		/>
	);
};

export default TextField;
