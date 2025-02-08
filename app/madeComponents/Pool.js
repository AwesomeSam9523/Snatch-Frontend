import React, { useState, useEffect } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import {get} from '../service'

const AdminPanel = () => {
  const [pools, setPools] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scope, animate] = useAnimate();

  const staggerList = stagger(0.15, { startDelay: 0.2 });

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await fetch("/admin/team/all"); 

        if (!response.ok) {
          throw new Error("Failed to fetch pools data");
        }

        const data = await response.json(); 
        setPools(data.data || []); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  
  if (loading) return <p>Loading pools...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Render pools */}
      {pools.map((pool) => (
        <div key={pool.pool} className="bg-white p-6 m-4 rounded-lg shadow-lg border">
          <h3 className="text-2xl text-center font-semibold text-gray-400 mb-4">
            Pool #{pool.pool}
          </h3>

          {/* Animated List Container */}
          <div ref={scope}>
            <motion.ul
              className="space-y-4 opacity-0 translate-y-5"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {pool.teams.map((team, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md opacity-0 scale-75 -translate-x-10"
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: staggerList }}
                >
                  <span className="font-Hanson rounded-[27.58px] bg-gray-200 text-black font-semibold py-2 px-4">
                    #{index + 1}
                  </span>
                  <img src={team.avatar} alt={team.name} className="w-14 h-14 rounded-full" />
                  <button className="rounded-lg bg-gray-300 font-normal px-4 py-2">
                    {team.name}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;