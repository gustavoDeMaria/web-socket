
    export interface IPrimaryResource {
        story_type: string;
        name: string;
        url: string;
        id: number;

        kind: string;
    }

    export interface INewValues {
        accepted_at: number;
        before_id: number;
        after_id: number;
        current_state: string;
        updated_at: number;
    }

    export interface IOriginalValues {
        accepted_at?: any;
        before_id: number;
        after_id: number;
        current_state: string;
        updated_at: number;
    }

    export interface IChange {
        story_type: string;
        story_priority: string;
        name: string;
        new_values: INewValues;
        original_values: IOriginalValues;
        id: number;
        change_type: string;
        kind: string;
    }

    export interface IPerformedBy {
        name: string;
        initials: string;
        id: number;
        kind: string;
    }

    export interface IProject {
        name: string;
        id: number;
        kind: string;
    }

    export interface IStoryAlterated {
        occurred_at: number;
        highlight: string;
        primary_resources: IPrimaryResource[];
        changes: IChange[];
        message: string;
        project_version: number;
        performed_by: IPerformedBy;
        guid: string;
        project: IProject;
        kind: string;
    }
