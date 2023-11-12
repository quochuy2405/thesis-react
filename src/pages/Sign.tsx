import { SwitchForm } from "@/components/molercules";

const SignPage = () => (
	<div className='flex items-center justify-center w-screen h-screen bg-gray-50'>
		<div className='w-full h-full md:w-4/5 md:h-5/6 max-w-5xl rounded-xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 bg-white'>
			<div className='bg-emerald-400 h-full w-full p-4'>
				<img alt='login' src='/login-stick.svg' width={200} height={200} />
				<img alt='monitor' src='/monitor.svg' width={500} height={500} className='opacity-90' />
				<h2 className='font-semibold text-xl text-white capitalize mt-2 text-center'>
					Welcome to Thesis AI
				</h2>
			</div>
			<div className='h-full p-4 py-8 flex flex-col'>
				<SwitchForm />
			</div>
		</div>
	</div>
);

export default SignPage;
