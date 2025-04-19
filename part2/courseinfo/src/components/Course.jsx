const Header = (props) => <h2>{props.course}</h2>

const Content = ({ parts }) => (
    <div>
        {parts.map((part) => (
            <Part key={part.id} part={part} />
        )
        )}
    </div>
)

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)

const Total = (props) => <p><b>Total of {props.total} exercises</b></p>

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => {
                return (
                    <div key={course.id}>
                        <Header course={course.name} />
                        <Content parts={course.parts} />
                        <Total
                            total={course.parts.reduce((sum, part) => part.exercises + sum, 0)}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Course
