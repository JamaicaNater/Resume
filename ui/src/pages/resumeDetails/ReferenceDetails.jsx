import PropTypes from 'prop-types';
import NoBorderTable from "../../components/NoBordersTable"
import camelCaseToCapitalizedWords from "../../utils/misc";
import { ignoredFields } from './utils';

const ReferenceDetails = ({ reference }) => {
    let table = {};

    Object.keys(reference).forEach((key) => {
        if (ignoredFields.has(key)) {
            return;
        }
        if (!reference[key]) {
            return;
        }

        table[camelCaseToCapitalizedWords(key)] = reference[key];
    });
    
    return(
        <NoBorderTable body={table}></NoBorderTable>
    );
}

ReferenceDetails.propTypes = {
    reference: PropTypes.shape({
        firstName: PropTypes.string.isRequired, 
        lastName: PropTypes.string.isRequired, 
    }).isRequired,
};
  

export default ReferenceDetails;