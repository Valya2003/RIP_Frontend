import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {formatDate} from "src/utils/utils.ts";
import {T_Calculation} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";

const CalculationsTable = ({calculations}:{calculations:T_Calculation[]}) => {
    const navigate = useNavigate()

    const handleClick = (calculation_id) => {
        navigate(`/calculations/${calculation_id}`)
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => value
            },
            {
                Header: 'Сила тока',
                accessor: 'current',
                Cell: ({ value }) => value
            },
            {
                Header: 'Дата создания',
                accessor: 'date_created',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата формирования',
                accessor: 'date_formation',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата завершения',
                accessor: 'date_complete',
                Cell: ({ value }) => formatDate(value)
            }
        ],
        []
    )

    return (
        <CustomTable columns={columns} data={calculations} onClick={handleClick}/>
    )
};

export default CalculationsTable