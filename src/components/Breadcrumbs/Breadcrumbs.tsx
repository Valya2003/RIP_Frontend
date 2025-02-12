import * as React from 'react';
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "store/store.ts";

const Breadcrumbs = () => {

    const location = useLocation()

    const resistor = useAppSelector((state) => state.resistors.resistor)

    const calculation = useAppSelector((state) => state.calculations.calculation)

    const {is_superuser} = useAppSelector((state) => state.user)

    const crumbs = () => {

        if (location.pathname == '/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/">
                            Главная
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/resistors/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={location.pathname}>
                            Резисторы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/resistors-table/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={location.pathname}>
                            Таблица резисторов
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/resistors/add') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={is_superuser ? "/resistors-table/" : "/resistors/"}>
                            Резисторы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={location.pathname}>
                            Добавление резистора
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (resistor) {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={is_superuser ? "/resistors-table/" : "/resistors/"}>
                            Резисторы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            {resistor.name}
                        </Link>
                    </BreadcrumbItem>
                </>
            )
        }

        if (calculation) {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to="/calculations/">
                            Вычисления
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Вычисление №{calculation?.id}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/calculations/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Вычисления
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/login/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Вход
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/register/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Регистрация
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/profile/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/profile/">
                            Личный кабинет
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        return (
            <>
                <BreadcrumbItem>
                    <Link to="/">
                        Главная
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem></BreadcrumbItem>
            </>
        )
    };

    return (
        <Breadcrumb className="fs-5">
            {crumbs()}
        </Breadcrumb>
    );
};

export default Breadcrumbs