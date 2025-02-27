import React from 'react';
import { motion } from 'framer-motion';
import type { Employee } from '../types';

interface EmployeeCardProps {
  employee: Employee;
  darkMode: boolean;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, darkMode }) => {
  const getBurnoutColor = (risk: number) => {
    if (risk >= 70) return 'bg-red-500';
    if (risk >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        p-4 rounded-xl border
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{employee.name}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {employee.role}
          </p>
        </div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
            ${getBurnoutColor(employee.burnoutRisk)}
          `}
        >
          {employee.burnoutRisk}%
        </motion.div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Workload</span>
            <span>{employee.workload}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${employee.workload}%` }}
              transition={{ duration: 1 }}
              className={`h-full ${employee.workload > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Satisfaction</span>
            <span>{employee.satisfaction}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${employee.satisfaction}%` }}
              transition={{ duration: 1 }}
              className={`h-full ${employee.satisfaction < 60 ? 'bg-red-500' : 'bg-green-500'}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};