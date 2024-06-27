import React, { ReactElement } from "react";
import styles from './toDoList.module.css';
import { Clock, CheckSquare, Trash2, StopCircle } from 'feather-icons-react'
import { message, Popconfirm } from 'antd';
import { ToDoListProps } from './types'


message.config({
    top: 60,
    duration: 2,
    maxCount: 3,
    prefixCls: 'my-message',
});

const ToDoList = ({
    status,
    title,
    description,
    deadline,
    onComplete,
    onDelete
}: ToDoListProps): ReactElement => {

    return (
        <div className={styles.root}>
            {onDelete &&
                <Popconfirm
                    title="Delete the task"
                    placement="left"
                    description="Are you sure to delete this task?"
                    onConfirm={() => {
                        message.error('Task deleted successfully');
                        onDelete()
                    }}
                    okText="Confirm"
                    cancelText="cancel"
                >
                    <div className={styles.delete_btn}
                    >
                        <Trash2 stroke={'#fff'} size={22} />

                    </div>
                </Popconfirm>
            }
            <div className={styles.status}>
                {status == 0 ?
                    <Clock size={120} stroke={'rgba(216, 138, 49, 0.2)'} /> :
                    status === -1 ? <Trash2 size={120} stroke={'rgba(160, 50, 20, 0.2)'} /> :
                        status === 2 ? <StopCircle size={120} stroke={'rgba(135, 135, 135, 0.2)'} /> :
                            <CheckSquare size={120} stroke={'rgba(49, 216, 57, 0.2)'} />
                }
            </div>
            <div className={styles.block}>
                <div>{title} <span>{deadline}</span></div>
                <pre>{description}</pre>
            </div>
            {status !== 1 && onComplete &&
                <Popconfirm
                    title="Complete the task"
                    placement="right"
                    description="Are you sure to complete this task?"
                    onConfirm={() => {
                        message.success('Task completed successfully');
                        onComplete()
                    }}
                    okText="Confirm"
                    cancelText="cancel"
                >
                    <div className={styles.complete_btn}
                    >
                        <CheckSquare stroke={'#fff'} size={22} />
                    </div>
                </Popconfirm>
            }
        </div>
    )
}

export default ToDoList