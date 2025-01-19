import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Resistor} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteResistor} from "store/slices/resistorsSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    resistors:T_Resistor[]
}

const ResistorsTable = ({resistors}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (resistor_id) => {
        navigate(`/resistors/${resistor_id}`)
    }

    const openResistorEditPage = (resistor_id) => {
        navigate(`/resistors/${resistor_id}/edit`)
    }

    const handleDeleteResistor = async (resistor_id) => {
        dispatch(deleteResistor(resistor_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Сопротивление',
                accessor: 'resistance',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openResistorEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteResistor(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!resistors.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={resistors} onClick={handleClick} />
    )
};

export default ResistorsTable