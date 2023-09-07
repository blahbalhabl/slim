import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faV} from '@fortawesome/free-solid-svg-icons'
import '../styles/Tooltip.css'

const Tooltip = ({data}) => {

  const [tooltip, setTooltip] = useState(false);

  const toggleTooltip = () => {
		setTooltip((prevTooltip) => !prevTooltip);
	};



  return (
		<>
      {data.map((item, i) => (
        <div key={i}>
          <div className="Tooltip" onClick={toggleTooltip}>
            <FontAwesomeIcon icon={faV} />
          </div>
          {tooltip && (
            <div className="Tooltip__Body">
              <div key={i}>
                <span>{item.buttons}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
};

export default Tooltip