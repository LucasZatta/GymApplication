import { User } from "src/entities/user";
import { InputType, Field } from "type-graphql";

@InputType()
export class ExamInput {
    @Field()
    name: string;

    @Field()
    doctorId: number;

    @Field(() => User)
    doctor: User;

    @Field()
    studentId: number;

    @Field(() => User)
    student: User;

    @Field()
    cardioFreq: number;

    @Field()
    artPressure: number;

    @Field()
    weight: number;

    @Field()
    height: number;

    @Field()
    fatPercentual: number;

    @Field()
    fitMassPercentual: number;

    @Field()
    imc: number;

    @Field()
    situation: boolean;
    
}