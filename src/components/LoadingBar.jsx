
import { Spinner} from 'react-bootstrap';

const LoadingBar =  () => {

    return <div className="container-content text-center"  style={{marginTop: 0}}>
                <Spinner size="lg"  animation="border" role="status" variant='primary' />
                <p className='mt-3 msg-loading'>جاري تحميل البيانات، المرجو الانتظار بضعة ثواني...</p>
            </div>

}


export default LoadingBar;