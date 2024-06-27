import React, { ReactElement } from "react";
import styles from "./trash.module.css";
import { useSelector } from "react-redux";
import ToDoList from "../../components/ToDoList";
import { RootState } from "../../store";
import { ToDo } from "../../types";
import { Status } from "../../enums";

const Trash = (): ReactElement => {
    const todoes = useSelector((state: RootState) => state.todoes)

    return (
        <div className={styles.root} >
            <div className={styles.todoes_container}>
                {todoes.filter((todo: ToDo) => todo.status === Status.trash).length ?
                    todoes.filter((todo: ToDo) => todo.status === Status.trash)
                        .map(todo => {
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
                        <div>Your deleted to do list is empty. </div>
                    </div>}
            </div>
        </div >
    );
};

export default Trash;
