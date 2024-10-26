import {TextElementLink} from "../models/link/TextElementLink";
import {TargetType} from "../models/html/TargetType";

export const navBarHomeElementLink = new TextElementLink('/',
                                                         TargetType.SELF);
export const navBarSearchElementLink = new TextElementLink('/search',
                                                           TargetType.SELF);
export const navBarAccountElementLink = new TextElementLink('/authorize',
                                                            TargetType.SELF);