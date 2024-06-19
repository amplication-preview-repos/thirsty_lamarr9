/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { Seller } from "./Seller";
import { SellerCountArgs } from "./SellerCountArgs";
import { SellerFindManyArgs } from "./SellerFindManyArgs";
import { SellerFindUniqueArgs } from "./SellerFindUniqueArgs";
import { CreateSellerArgs } from "./CreateSellerArgs";
import { UpdateSellerArgs } from "./UpdateSellerArgs";
import { DeleteSellerArgs } from "./DeleteSellerArgs";
import { ProductFindManyArgs } from "../../product/base/ProductFindManyArgs";
import { Product } from "../../product/base/Product";
import { SellerService } from "../seller.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Seller)
export class SellerResolverBase {
  constructor(
    protected readonly service: SellerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Seller",
    action: "read",
    possession: "any",
  })
  async _sellersMeta(
    @graphql.Args() args: SellerCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Seller])
  @nestAccessControl.UseRoles({
    resource: "Seller",
    action: "read",
    possession: "any",
  })
  async sellers(@graphql.Args() args: SellerFindManyArgs): Promise<Seller[]> {
    return this.service.sellers(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Seller, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Seller",
    action: "read",
    possession: "own",
  })
  async seller(
    @graphql.Args() args: SellerFindUniqueArgs
  ): Promise<Seller | null> {
    const result = await this.service.seller(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Seller)
  @nestAccessControl.UseRoles({
    resource: "Seller",
    action: "create",
    possession: "any",
  })
  async createSeller(@graphql.Args() args: CreateSellerArgs): Promise<Seller> {
    return await this.service.createSeller({
      ...args,
      data: args.data,
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Seller)
  @nestAccessControl.UseRoles({
    resource: "Seller",
    action: "update",
    possession: "any",
  })
  async updateSeller(
    @graphql.Args() args: UpdateSellerArgs
  ): Promise<Seller | null> {
    try {
      return await this.service.updateSeller({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Seller)
  @nestAccessControl.UseRoles({
    resource: "Seller",
    action: "delete",
    possession: "any",
  })
  async deleteSeller(
    @graphql.Args() args: DeleteSellerArgs
  ): Promise<Seller | null> {
    try {
      return await this.service.deleteSeller(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Product], { name: "products" })
  @nestAccessControl.UseRoles({
    resource: "Product",
    action: "read",
    possession: "any",
  })
  async findProducts(
    @graphql.Parent() parent: Seller,
    @graphql.Args() args: ProductFindManyArgs
  ): Promise<Product[]> {
    const results = await this.service.findProducts(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
}
