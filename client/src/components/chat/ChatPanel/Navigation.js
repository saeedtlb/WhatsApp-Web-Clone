// svgs
import { ReactComponent as Message } from '../../../styles/icons/message.svg'
import { ReactComponent as Call } from '../../../styles/icons/call.svg'
import { ReactComponent as Status } from '../../../styles/icons/status.svg'
// style
import '../../../styles/Css/navigation.css'

const Navigation = () => (
  <div className="navigation">
    <div className="message__icon">
      <Message />
      <h5>message</h5>
    </div>
    <div className="call__icon">
      <Call />
      <h5>call</h5>
    </div>
    <div className="status">
      <Status />
      <h5>status</h5>
    </div>
  </div>
)

export default Navigation
