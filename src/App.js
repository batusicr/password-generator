import { useState, useRef, useCallback } from 'react';
import TextInput from 'components/text-input/TextInput';
import Slider from 'components/slider/Slider';
import Checkbox from 'components/checkbox/Checkbox';
import Button from 'components/button/Button';
import { ReactComponent as CopyIcon } from 'assets/images/copy.svg';
import Style from 'App.module.css';

const generatePassword = (length, options) => {
    const charsets = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_-+=<>?:;,.[]{}|~'
    };
    const passwordCharset = Object.keys(options)
        .filter((key) => options[key])
        .map((key) => charsets[key])
        .join('');

    let password = '';

    for (let i = 0; i < length; i++) {
        password += passwordCharset.charAt(Math.floor(Math.random() * passwordCharset.length));
    }

    return password;
};

function App() {
    const passwordInputRef = useRef(null);
    const [passwordLength, setPasswordLength] = useState(10);
    const [passwordOptions, setPasswordOptions] = useState({
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true
    });

    const handleCopyPassword = () => {
        navigator.clipboard
            .writeText(passwordInputRef.current.value)
            .then(passwordInputRef.current.select());
    };

    const handlePasswordOptionsChange = useCallback((e) => {
        const option = e.target.id;

        setPasswordOptions(prevState => {
            if (prevState.hasOwnProperty(option)) {
                const newState = {
                    ...prevState,
                    [option]: e.target.checked
                };

                const allOptionsUnselected = Object.values(newState).every((value) => !value);

                if (!allOptionsUnselected) {
                    return newState;
                }
            }

            return prevState;
        });
    }, []);

    return (
        <div className={Style.Generator}>
            <div className={Style.Container}>
                <TextInput
                    ref={passwordInputRef}
                    readOnly={true}
                    value={generatePassword(passwordLength, passwordOptions)}
                    className={Style.PasswordInput}
                />
                <CopyIcon title="Copy" className={Style.CopyIcon} onClick={handleCopyPassword} />
            </div>
            <div className={Style.Container}>
                <span className={Style.Label}>Password length: <strong>{passwordLength}</strong></span>
                <Slider value={passwordLength} min={5} max={35} onChange={setPasswordLength} />
            </div>
            <div className={Style.Container}>
                <span className={Style.Label}>Password options:</span>
                <ul className={Style.Options}>
                    {Object.keys(passwordOptions).map(option => (
                        <li key={option}>
                            <Checkbox id={option} checked={passwordOptions[option]} onChange={handlePasswordOptionsChange} />
                            <span>Include {option}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Button className={Style.Button} onClick={() => setPasswordOptions(prevState => ({...prevState}))}>
                Generate password
            </Button>
        </div>
    );
}

export default App;
