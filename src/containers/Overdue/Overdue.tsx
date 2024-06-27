import React, { ReactElement } from "react";
import styles from "./completed.module.css";
import { useSelector } from "react-redux";
import ToDoList from "../../components/ToDoList";
import { RootState } from "../../store";
import { ToDo } from "../../types";
import { Status } from "../../enums";

const Overdue = (): ReactElement => {
    const todoes: ToDo[] = useSelector((state: RootState) => state.todoes)

    return (
        <div className={styles.root} >
            <div className={styles.todoes_container}>
                {todoes.filter((todo: ToDo) => todo.status === Status.overdue).length ?
                    todoes.filter((todo: ToDo) => todo.status === Status.overdue)
                        .map((todo: ToDo): ReactElement => {
                            return (
                                <ToDoList key={todo.id}
                                    title={todo.title}
                                    description={todo.description}
                                    deadline={todo.deadline}
                                    status={todo.status}
                                    createdTimestamp={todo.createdTimestamp}

                                />
                            )
                        }) :
                    <div className={styles.empty_list}>
                        <div>Your overdue list is empty. </div>
                    </div>}
            </div>
        </div >
    );
};

export default Overdue;
