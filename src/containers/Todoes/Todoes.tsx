import React, { useEffect, useLayoutEffect, useState, useRef, ReactElement } from "react";
import styles from "./todoes.module.css";
import { FloatButton, Modal, Form, Input, Button, DatePicker } from "antd";
import { Plus } from 'feather-icons-react';
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/slices/todoes";
import ToDoList from "../../components/ToDoList";
import dayjs, { type Dayjs } from "dayjs";
import { RootState } from "../../store";
import { ToDo } from "../../types";
import { Status } from "../../enums";

const Todoes = (): ReactElement => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false)
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const todoes: ToDo[] = useSelector((state: RootState) => state.todoes)
    const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)

    useLayoutEffect(() => {
        let state = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")!) : []
        dispatch(todoActions.updateOnLoad(state))
    }, [])

    useEffect(() => {
        intervalId.current = setInterval(() => {
            const state = JSON.parse(localStorage.getItem("state")!)
            state.forEach((item: ToDo) => {
                if (dayjs(item.deadline).unix() < dayjs().unix() && item.status === Status.toDo) {
                    dispatch(todoActions.overdue(item.id))
                }
            })
        }, 2000)

        return () => {
            if (intervalId.current) clearInterval(intervalId.current)
        }
    }, [])

    const formItemLayout = {
        labelCol: { span: 4 }
    };

    const onFinish = (values) => {
        form.validateFields();

        const currentDate: Dayjs = dayjs()

        dispatch(todoActions.add({
            ...values,
            deadline: values.deadline.format('YYYY-MM-DD HH:mm:ss'),
            status: 0,
            createdTimestamp: currentDate.unix(),
            id: Math.floor(Math.random() * performance.now() * currentDate.unix())
        }))
        setModalIsOpened(false)
        form.resetFields();
    };

    return (
        <div className={styles.root} >
            <div className={styles.todoes_container}>
                {todoes.filter((todo: ToDo) => todo.status === Status.toDo).length ?
                    todoes.filter((todo: ToDo) => todo.status === Status.toDo)?.map((todo: ToDo): ReactElement => {
                        return (
                            <ToDoList key={todo.id}
                                title={todo.title}
                                description={todo.description}
                                deadline={todo.deadline}
                                status={todo.status}
                                createdTimestamp={todo.createdTimestamp}
                                onComplete={() => {
                                    dispatch(todoActions.complete(todo.id))
                                }}
                                onDelete={() => {
                                    dispatch(todoActions.delete(todo.id))
                                }}
                            />
                        )
                    }) :
                    <div className={styles.empty_list}>
                        <div className={styles.hint}>Well done </div>
                        <div>Your to do list is empty. Time to recharge. </div>
                    </div>}
            </div>

            <FloatButton style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
            }}
                onClick={() => {
                    setModalIsOpened(true)
                }}
                shape="square"
                type="primary"
                icon={<Plus size={20} />}
            />
            <Modal title="Basic Modal"
                open={modalIsOpened}
                onCancel={() => setModalIsOpened(false)}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    layout={'vertical'}
                    form={form}
                    initialValues={{ layout: 'vertical' }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                >

                    <div className={styles.row}>
                        <Form.Item label="title"
                            name={'title'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input title!',
                                },
                            ]}
                        >
                            <Input placeholder="title" />
                        </Form.Item>
                        <Form.Item label="deadline"
                            name='deadline'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input deadline!',
                                },
                            ]}
                        >
                            <DatePicker style={{ width: '100%', flex: 1 }}
                                showTime
                                format={{
                                    format: 'YYYY-MM-DD HH:mm:ss',
                                    type: 'mask',
                                }}
                                minDate={dayjs()}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item label="description" name={'description'}>
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
};

export default Todoes;
