import Capacity from "../Capacity/Capacity";
import Holiday from "../Holiday/Holiday";
import Timeslots from "../Timeslots/Timeslots";

function SectionContent(props){
    switch(props.activeItem){
        case "Capacity":
            return <Capacity/>
            break;
        case "HolidayList":
            return <Holiday/>
            break;
        case "TimeSlots":
            return <Timeslots/>;
            break;
        default:
            return "";
            break;
    }
}

export default SectionContent;