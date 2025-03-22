import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import storageService from "../../appwrite/StorageService";
import databasesService from "../../appwrite/DatabasesService";
import { useCallback, useEffect } from "react";
import { Button, Input, RTE, Select } from "../index";

const PostForm = ({ post }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        reset,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.userId);

    useEffect(() => {
        reset({
            title: post?.title || "No title",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        });
    }, [post, reset]);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0]
                ? await storageService.uploadFile(data.image[0])
                : null;

            if (file) {
                storageService.deleteFile(post.featuredImage);
            }

            const dbPost = await databasesService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await storageService.uploadFile(data.image[0]);

            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await databasesService.createPost({
                    ...data,
                    userId,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^[a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        {post?.featuredImage && (
                            <img
                                src={storageService.getFilePreview(
                                    post.featuredImage
                                )}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        )}
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
