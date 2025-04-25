import locationIcon from './assets/location.svg';
import openInFull from './assets/open-in-full.svg';

export function EmployeeCard(props) {

    function handleExpandCard() {
        console.log("Expand card clicked");
    }

    let statusClassName;
    const showDetails = props.showDetails
    if (props.status === 'active') statusClassName = 'status-dot-active';
    else if (props.status === 'inactive') statusClassName = 'status-dot-inactive';

    return (
        <div className="card">
          {showDetails && (
            <div className='expand-btn' onClick={handleExpandCard}>
            
                <img src={openInFull} alt="Click to expand card" />
            </div>
          )}

          <p className='card-title'>
            <span className={statusClassName}></span>
            {props.name}
          </p>

          {showDetails && (
            <div className='card-details'>
              <span className='status-icon-container'>
                <img className='location-icon' src={locationIcon} alt="Location Icon" />
              </span>
              {props.location}
            </div>
          )}
        </div>
    );
}
