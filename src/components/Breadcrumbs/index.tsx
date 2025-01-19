import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Resistor} from "modules/types.ts";

interface Props {
    selectedResistor: T_Resistor | null
}

const Breadcrumbs = ({ selectedResistor }: Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/resistors") &&
                <BreadcrumbItem active>
                    <Link to="/resistors">
						Резисторы
                    </Link>
                </BreadcrumbItem>
			}
            {selectedResistor &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedResistor.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs