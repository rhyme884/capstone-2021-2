import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from "../../modules";
import { Solved } from "../../types";

type Props = {

}

const Histories: React.FunctionComponent<Props> = ({ }) => {
    const { passed } = useSelector((state: RootState) => state.ProbReducer);
    const { score, total } = useSelector((state: RootState) => state.HealthGaugeReducer)
    const scrollView: React.MutableRefObject<HTMLDivElement> = React.useRef(null);

    React.useEffect(() => {
        scrollView.current.scrollTop = scrollView.current.scrollHeight;
    }, [ passed ])

    return (
        <div>
            <div style={{ backgroundColor: '#FFF', width: '17rem', height: '8vh', borderRadius: '5rem', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '12pt' }}>
                    SCORE BOARD
                </span>
                <span style={{ color: '#000', marginTop: '2pt' }}>
                    {`SCORE: ${score ? score : 0}`}
                </span>
            </div>
            <div className={"ovf"} ref={scrollView}
                 style={{ width: '17rem', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflowY: 'auto',
                     background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(218, 215, 229, 1) 20%, rgba(0, 0, 0, 0) 100%)', border: 0, borderRadius: '12pt',
                     paddingLeft: '8pt', paddingRight: '8pt' }}>
                {
                    passed && passed.map((pass: Solved) => [
                        <div key={pass.id} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ color: pass.passed ? '#1976d2' : 'indianred', fontWeight: 'bold', fontSize: '10pt' }}>
                                {`${pass.eng}(${pass.tried})`}
                            </p>
                        </div>
                    ])
                }
            </div>
        </div>
    );

}

export default Histories;