import AuthForm from './AuthForm';

export default function AuthBody({ type }: { type: string }){
    return(
        <div className="h-screen w-screen bg-cream">
            <p className="font-cartoon text-dark-cream font-bold text-6xl text-center py-10">SketchBuddy</p>
            <div className="flex justify-evenly mt-10">
                <div className="w-[40%]">
                    <p className="font-cartoon text-dark-cream text-center text-2xl">Integrative Sharing Options</p>
                </div>
                <div className='w-[40%] flex justify-center'>
                    <AuthForm type={type} />
                </div>
            </div>
        </div>
    )
}