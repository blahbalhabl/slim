import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import '../styles/Accordion.css'

const Accordion = ({ data }) => {

	const [selected, setSelected] = useState(null);

	const toggleAccordion = (i) => {
		if (selected === i) {
			return setSelected(null);
		}
		setSelected(i);
	};

  return (
		<>
			{data.map((item, i) => (
				<div>
					<div 
						key={i} 
						className="Accordion" 
						onClick={() => toggleAccordion(i)}
					>
						<div className="Accordion__Title"	>
							<FontAwesomeIcon icon={faPaperclip} />
							<p className="Accordion__Text">{item.title}</p>
							<span className="Accordion__Icon">
								{selected === i ? '<' : '+'}
							</span>
						</div>
					</div>
					<div
						className={
							selected === i
								? 'Accordion__Content show'
								: 'Accordion__Content'
						}
					>
						{item.contents.map((content, j) => (
							<div key={j}>
								<p>{content.title}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</>
	)
};

export default Accordion