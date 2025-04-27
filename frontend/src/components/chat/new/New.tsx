import { JSX } from 'react';
import './New.css';
import { useForm } from 'react-hook-form';
import { IoSend } from 'react-icons/io5';

interface PropsNew {
    onSend: (text: string) => void;
}

function New({ onSend }: PropsNew): JSX.Element {
    const { register, handleSubmit, formState: { isValid }, reset } = useForm<{text: string}>({
        mode: 'onChange'
    });

    function submit(draft: {text: string}) {
        onSend(draft.text)
        reset()
    }

    return (
        <div className='New'>
            <form onSubmit={handleSubmit(submit)}>
                <textarea style={{ resize: 'none' }} cols={30} rows={1} placeholder='Write something...' {...register('text', {
                    required: {
                        value: true,
                        message: ""
                    }
                })} />

                <button type="submit" disabled={!isValid}>
                    <IoSend />
                </button>
            </form>
        </div>
    )
}

export default New;