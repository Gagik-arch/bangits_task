import React, { ReactElement } from "react";
import styles from "./completed.module.css";
import { useSelector } from "react-redux";
import ToDoList from "../../components/ToDoList";
import { ToDo } from '../../types'
import { RootState } from "../../store";
import { Status } from "../../enums";

const Completed = (): ReactElement => {
    const todoes: ToDo[] = useSelector((state: RootState) => state.todoes)

    return (
        <div className={styles.root} >
            <div className={styles.todoes_container}>
                {todoes.filter((todo: ToDo) => todo.status === Status.completed).length ?
                    todoes.filter((todo: ToDo) => todo.status === Status.completed)
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
                        <div>Your completed to do list is empty. </div>
                    </div>}
            </div>
        </div >
    );
};

export default Completed;
