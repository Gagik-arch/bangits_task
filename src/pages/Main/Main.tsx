import React from 'react'
import { Tabs, ConfigProvider } from 'antd';
import styles from './main.module.css';
import { List, Trash as TrashIcon, CheckSquare, StopCircle } from 'feather-icons-react';
import Todoes from '../../containers/Todoes';
import Trash from '../../containers/Trash';
import Completed from '../../containers/Completed';
import Overdue from '../../containers/Overdue';

const Main = () => {

    return (
        <div className={styles.root}>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            horizontalItemPaddingLG: '16px',
                        },
                    },
                }}
            >
                <Tabs defaultActiveKey="2"
                    centered={true}
                    indicator={{ align: 'center' }}
                    items={[
                        {
                            key: '1',
                            label: 'trash',
                            children: <Trash />,
                            icon: <span className={styles.icon}><TrashIcon size={18} /></span>
                        },
                        {
                            key: '2',
                            label: 'toDoes',
                            children: <Todoes />,
                            icon: <span className={styles.icon}><List size={18} /></span>
                        },
                        {
                            key: '3',
                            label: 'completed',
                            children: <Completed />,
                            icon: <span className={styles.icon}>
                                <CheckSquare size={18} />
                            </span >
                        },
                        {
                            key: '4',
                            label: 'overdue',
                            children: <Overdue />,
                            icon: <span className={styles.icon}>
                                <StopCircle size={18} />
                            </span >
                        },

                    ]}
                />
            </ConfigProvider>
        </div>
    )
}

export default Main