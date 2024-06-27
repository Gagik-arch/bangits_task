export type ToDoListProps = {
    deadline: string;
    status: number;
    createdTimestamp: number;
    title: string;
    description?: string;
    onComplete?: () => void;
    onDelete?: () => void;
};
