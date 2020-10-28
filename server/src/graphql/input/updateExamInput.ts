import { User } from "src/entities/user";
import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateExamInput {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    doctorId: number;

    @Field(() => User)
    doctor: User;

    @Field({ nullable: true })
    studentId: number;

    @Field(() => User, {nullable: true})
    student: User;

    @Field({ nullable: true })
    cardioFreq: number;

    @Field({ nullable: true })
    artPressure: number;

    @Field({ nullable: true })
    weight: number;

    @Field({ nullable: true })
    height: number;

    @Field({ nullable: true })
    fatPercentual: number;

    @Field({ nullable: true })
    fitMassPercentual: number;

    @Field({ nullable: true })
    imc: number;

    @Field({ nullable: true })
    situation: boolean;
    
}