
export interface IPivotalResponse {
    kind: string;
    id: number;
    created_at: Date;
    updated_at: Date;
    estimate: number;
    story_type: string;
    story_priority: string;
    name: string;
    current_state: string;
    requested_by_id: number;
    url: string;
    project_id: number;
    owner_ids: number[];
    labels: any[];
    owned_by_id: number;
}
