import React from 'react'
// style
import '../../../styles/Css/message.css'

const Message = () => {
  return (
    <div className="message">
      <div className="texts">
        <div className="myself">hi, dear</div>
        <div className="other">what's up bro???</div>
      </div>
      <div className="communication">
        <form>
          <textarea name="message" />
          <button />
        </form>
      </div>
    </div>
  )
}

export default Message
