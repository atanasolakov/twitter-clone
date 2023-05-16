import React, {useCallback, useState} from 'react';
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import {tr} from "date-fns/locale";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import axios from "axios";
import Avatar from "@/components/Avatar";
interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}
const Form: React.FC<FormProps> = ({placeholder,isComment,postId}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = useCallback(async ()=> {
        try {
         setIsLoading(true);
         await axios.post('/api/posts', {body});
         toast.success('Post Created');
         setBody('');
         mutatePosts();
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts]);
    return (
        <div className={"border-b-[1px] border-neutral-800 px-5 py-2"}>
            { currentUser ? (
                <div className={' flex flex-row gap-4'}>
                    <div>
                        <Avatar userId={currentUser?.id} />
                    </div>
                    <div className={'w-full'}>
                       <textarea className={'disabled:opacity-80 peer resize-none mt-3 w-full bg-black' +
                           ' ring-0 outline-none text-[20px] placeholder-neutral-500 text-white'}
                                 disabled={isLoading} onChange={(e) => setBody(e.target.value)}
                                 value={body} placeholder={placeholder} />
                         <hr className={'opacity-0 peer-focus:opacity:100 h-1[px] w-full border-neutral-800 transition'}/>
                        <div className={'mt-4 flex flex-row justify-end'}>
                            <Button label={'Tweet'} onClick={onSubmit} disabled={isLoading || !body}/>
                        </div>
                    </div>
                </div>
            ) : (
            <div className={"py-8"}>
                <h1 className={'text-white text-2xl text-center mb-4 font-bold'}>Welcome to Twitter</h1>

            <div className={' flex flex-row items-center justify-center gap-4'}>
             <Button label={'Login'} onClick={loginModal.onOpen} secondary/>
                <Button label={'Register'} onClick={registerModal.onOpen}/>
            </div>
            </div>
                )}
        </div>
    );
};

export default Form;