import React from 'react';
import { NextPage } from "next";
import {ApolloQueryResult, useMutation} from "@apollo/client";
import { NextRouter, useRouter } from "next/router";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { SignUpType } from "../../src/types";
import { POST_SIGN } from "../../src/graphQL/quries";
import Cookies from 'js-cookie';
import Notiflix from 'notiflix';
import Image from 'next/image';
import {routeHttpStatus} from "../../utils/func";

type Props = {

}

const Sign: NextPage<Props> = ({  }) => {
    const [ sign, setSign ] = React.useState<SignUpType>({
        email: '',
        password: '',
        name: ''
    })

    const [ register, { loading }] = useMutation(POST_SIGN);
    let { email, password, name } = sign;

    const CALL_SIGN_API = async () => {
        if (email.length === 0 && password.length >= 6 && name.length === 0) {
            Notiflix.Notify.Warning(password.length < 6 ? '비밀번호는 6자리 이상으로 구성해주세요.' : 'Please Fill out the required Fields.');
            return;
        } else {
            await register({ variables: { id: email, password, name }})
                .then((res: ApolloQueryResult<any>) => {
                    if (res && res.data && res.data.sign.status === 200) {
                        router.push('/login').then();
                        Notiflix.Notify.Success('Successfully signed up!')
                    } else if (res && (res.data.sign.status === 400 || res.data.sign.status === 406 || res.data.sign.status === 500)) {
                        Notiflix.Report.Failure('회원가입에 실패했습니다.', '아이디 / 비밀번호를 확인해주세요.', 'OK!');
                        return;
                    } else routeHttpStatus(router, res.data.sign.status, res.data.sign.message);
                })
        }
    }
    const router: NextRouter = useRouter();
    return (
        <div className={"ovf"}
             style={{ width: '100%', height: '80vh', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ width: '260pt', border: 0, borderRadius: '30pt', height: '500pt',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Image
                    src={"/hiing.png"}
                    alt="Picture of the author"
                    width={800}
                    height={500}
                />
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '12pt' }}>
                    <TextField label={'Email'} value={email} style={{ width: '100%' }}
                               onChange={(e) => setSign({ ...sign, email: e.target.value })}/>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '12pt' }}>
                    <TextField label={'Password'} value={password} style={{ width: '100%' }} type={'password'}
                               onChange={(e) => setSign({ ...sign, password: e.target.value })}/>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '12pt' }}>
                    <TextField label={'Name'} value={name} style={{ width: '100%' }}
                               onChange={(e) => setSign({ ...sign, name: e.target.value })}/>
                </div>
                <Button onClick={() => CALL_SIGN_API()}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200pt',
                            backgroundColor: Cookies.get('dove-dark-mode') === 'true' ? '#b2c2bf' : '#1976d2', marginTop: '16pt' }}>
                    { loading ?
                        <CircularProgress />
                        :
                        <span style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '14pt',
                            color: Cookies.get('dove-dark-mode') === 'true' ? '#000' : '#FFF' }}>
                            회원가입
                        </span>
                    }
                </Button>
            </div>
        </div>
    )
}

export default Sign;