
import React from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import UserAlert from "../components/userAlert";
import UserInput from "../components/userInput";


function Adduser() {
  return (
    <Layout>
      <section className="flex justify-center items-center">
        <section className="w-[1355px] h-[650px] flex justify-center items-center relative my-10">
          <div className="flex flex-col gap-2 lg:bg-secondary md:bg-secondary p-24 items-center">
            <div className="flex flex-col gap-2 lg:bg-secondary md:bg-secondary p-24 items-center">
              <div className="text-2xl font-bold mb-4 underline">Add User</div>
              <form className="flex flex-col items-end">
                <div className="mb-4">
                  <UserInput inputKey="nom" child="WRITE" />
                </div>
                <div className="mb-4">
                  <UserInput inputKey="prenom" child="WRITE" />


                </div>
                <div className="mb-4">
                  <UserInput inputKey="poste" child="WRITE" />

                </div>
                <div className="mb-4">
                  <UserInput inputKey="matricule" child="WRITE" />

                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Write
                </button>
              </form>
            </div>
          </div>
          <section className="absolute right-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center ">
                <UserAlert
                  child="WRITE"
                  alertKey="done"
                />
              </div>
              <div className="flex flex-col items-center ">
                <UserAlert
                  child="WRITE"
                  alertKey="error"
                />
              </div>

              <div className="flex flex-col items-center ">
                <UserAlert
                  child="WRITE"
                  alertKey="presence"
                />
              </div>
            </div>

          </section>
        </section>
      </section>
    </Layout>
  );
};

export default Adduser;
