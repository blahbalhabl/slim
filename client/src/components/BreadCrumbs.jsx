import '../styles/BreadCrumbs.css'

const BreadCrumbs = ({ items }) => {
  return (
    <nav className="BreadCrumbs">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <p>/{item.label}</p> 
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
