import { UserAccessParams } from "@infra/guards/user-access/user-access-params.interface";
import { RouteAnimationParams } from "@presenter/models/router/route-animation-params.interface";

export type RouteData = UserAccessParams & RouteAnimationParams;

