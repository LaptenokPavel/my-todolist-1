import {FilterValuesType, TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-STATUS'
    id: string,
    isDone: boolean,
    todolistId: string
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TITLE'
    id: string,
    newTitle: string
    todolistId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType | changeTaskStatusActionType |
    changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id != action.id)
            return (stateCopy)
        }
        case 'ADD-TASK': {
            let stateCopy = {...state}
            let task = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todolistId] = [task, ...stateCopy[action.todolistId]]
            return (stateCopy)
        }
        case 'CHANGE-STATUS': {
            return{
                ...state,
                [action.todolistId]:state[action.todolistId].map(t=>{
                    if(action.id === t.id){
                        return{...t, isDone:action.isDone}
                    }
                    else return t
                })
            }
        }
        case 'CHANGE-TITLE':
            return{
                ...state,
                [action.todolistId]:state[action.todolistId].map(t=>{
                    if(action.id === t.id){
                        return{...t, title:action.newTitle}
                    }
                    else return t
                })
            }


        case 'ADD-TODOLIST': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return (stateCopy)
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return (stateCopy)
        }

        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id: id, todolistId: todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS', id: id, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE', id: id, newTitle: newTitle, todolistId: todolistId}
}