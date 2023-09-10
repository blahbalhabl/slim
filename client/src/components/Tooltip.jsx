import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from "../utils/Icons";
import '../styles/Tooltip.css'

const Tooltip = ({data}) => {

  const [tooltip, setTooltip] = useState(false);
  // const [overlay, setOverlay] = useState(false);

  const toggleTooltip = () => {
		setTooltip((prev) => !prev);
    // setOverlay((prev) => !prev);
	};

  return (
		<>
      {data.map((item, i) => (
        <div key={i}>
          <div className="Tooltip" onClick={toggleTooltip}>
            <FontAwesomeIcon icon={icons.v} />
          </div>
          {tooltip && (
            <>
            <div className="Tooltip__Body">
              <div key={i}>
                <ul className="Tooltip__Buttons">{item.buttons}</ul>
              </div>
            </div>
            {/* <div className="Tooltip__Overlay" onClick={toggleTooltip}></div> */}
            </>
          )}
        </div>
      ))}
     
    </>
  )
};

export default Tooltip