import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Activity } from "../../entities/activity";
import { ActivityPricing } from "../../entities/activityPricing";
import { Class } from "../../entities/class";
import { ActivityInput, PricingInput } from "../input/activityInput";
import { ClassInput } from "../input/classInput";
import { ActivityResponse } from "../response/activityResponse";

@Resolver()
//Dont forget to uncoment authorized
export class ActivityResolver {
  @Query(() => [Activity])
  @Authorized()
  async activities(): Promise<Activity[]> {
    return getConnection()
      .getRepository(Activity)
      .createQueryBuilder("a")
      .leftJoinAndSelect("a.classes", "class")
      .getMany();
  }

  @Query(() => Activity)
  @Authorized()
  async activity(
    @Arg("id", () => Int) id: number
  ): Promise<Activity | undefined> {
    return getConnection()
      .getRepository(Activity)
      .createQueryBuilder("a")
      .leftJoinAndSelect("a.classes", "class")
      .where("a.id = :id", { id })
      .getOne();
  }

  @Mutation(() => ActivityResponse)
  @Authorized()
  async insertActivity(
    @Arg("data", () => ActivityInput) data: ActivityInput
  ): Promise<ActivityResponse> {
    const sameNameActivity = await Activity.findOne({ name: data.name });
    if (sameNameActivity)
      return { errorMessage: "Já existe uma Modalidade com o nome indicado" };

    const activityId = await (await Activity.insert({ name: data.name })).raw[0]
      .id;

    let insertErrorMessage;
    //Insert classes
    if (data.classes) {
      insertErrorMessage = await this.insertClassesIntoDB(
        activityId,
        data.classes
      );
      if (insertErrorMessage) return { errorMessage: insertErrorMessage };
    }

    //Insert pricing
    if (data.pricings) {
      insertErrorMessage = await this.insertPricingIntoDB(
        activityId,
        data.pricings
      );
      //Need to implement
      //if (insertErrorMessage) return { errorMessage: insertErrorMessage };
    }

    const newActivity = await Activity.findOne(activityId);
    return { activity: newActivity };
  }

  @Mutation(() => ActivityResponse)
  @Authorized()
  async insertClasses(
    @Arg("data", () => [ClassInput]) data: ClassInput[],
    @Arg("id", () => Int) id: number
  ): Promise<ActivityResponse> {
    //Check if activity exists
    let errorMessage = await this.checkIfActivtyExits(id);
    if (errorMessage) return { errorMessage };

    this.insertClassesIntoDB(id, data);

    const updatedActivity = await getConnection()
      .getRepository(Activity)
      .createQueryBuilder("a")
      .leftJoinAndSelect("a.classes", "class")
      .where("a.id = :id", { id })
      .getOne();
    return { activity: updatedActivity };
  }

  async insertClassesIntoDB(
    id: number,
    data: ClassInput[]
  ): Promise<string | undefined> {
    //Check for unique time
    const selectedClasses = await getConnection()
      .getRepository(Class)
      .createQueryBuilder("c")
      .leftJoinAndSelect(Activity, "a", 'c."activityId" = a.id')
      .where("c.time IN (:times)", {
        times: data?.map((c) => c.classTime) ?? [],
      })
      .getMany();

    let classWithRepeatedTime = selectedClasses.find((x) => x.activityId != id);
    if (classWithRepeatedTime)
      return (
        "Já existe uma atividade de " +
        classWithRepeatedTime.activity?.name +
        " no horário de " +
        classWithRepeatedTime.time
      );
    //insert updated classes
    await getConnection().transaction(async (em) => {
      await em
        .createQueryBuilder()
        .delete()
        .from(Class)
        .where('"activityId" = :id', { id })
        .execute();

      await em
        .createQueryBuilder()
        .insert()
        .into(Class)
        .values(
          data?.map((x) => {
            return {
              activityId: id,
              time: x.classTime,
              maxStudents: x.maxStudents,
            };
          }) ?? []
        )
        .execute();
    });

    return undefined;
  }

  @Mutation(() => ActivityResponse)
  @Authorized()
  async insertActivitiesPricing(
    @Arg("data", () => [PricingInput]) data: PricingInput[],
    @Arg("id", () => Int) id: number
  ): Promise<ActivityResponse> {
    //Check if activity exists
    let errorMessage = await this.checkIfActivtyExits(id);
    if (errorMessage) return { errorMessage };

    //check for repeated
    await this.insertPricingIntoDB(id, data);

    const newActivity = await Activity.findOne(id);
    return { activity: newActivity };
  }

  async insertPricingIntoDB(id: number, data: PricingInput[]) {
    await ActivityPricing.insert(
      data.map((x) => {
        return {
          activityId: id,
          type: x.type,
          payments: x.payments,
          installment: x.installment,
        };
      })
    );
  }

  async checkIfActivtyExits(id: number): Promise<string | undefined> {
    const selectedActivity = await Activity.findOne(id);
    if (!selectedActivity) return;
    ("Nāo foi possível encontrar a atividade selecionada");

    return undefined;
  }
}
