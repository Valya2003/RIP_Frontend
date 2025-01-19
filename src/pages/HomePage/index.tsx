import {Container, Row} from "reactstrap";

const HomePage = () => {
	return (
		<Container>
			<Row>
				<h1 className="mb-3">Задачи по электротехнике</h1>
				<p className="fs-5">Содержит краткий учебный материал и примеры решения типовых задач по теме «Линейные
					электрические цепи постоянного тока».
					Предназначено для студентов неэлектротехнических специальностей дневной и заочной форм
					обучения.</p>
			</Row>
		</Container>
	)
}

export default HomePage